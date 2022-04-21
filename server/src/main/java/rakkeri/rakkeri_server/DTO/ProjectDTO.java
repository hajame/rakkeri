package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashSet;
import java.util.Set;

public class ProjectDTO {
    @JsonProperty("id")
    private final Long id;
    private String name;
    private Set<TrackingDTO> trackings = new HashSet<>();

    public ProjectDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProjectDTO(Long id, String name, Set<TrackingDTO> trackings) {
        this(id, name);
        this.trackings = trackings;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TrackingDTO> getTrackings() {
        return trackings;
    }

    public void setTrackings(Set<TrackingDTO> trackings) {
        this.trackings = trackings;
    }

    @Override
    public String toString() {
        return "ProjectDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", trackings=" + trackings +
                '}';
    }
}
