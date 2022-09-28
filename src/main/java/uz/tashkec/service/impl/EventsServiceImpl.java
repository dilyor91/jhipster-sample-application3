package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.Events;
import uz.tashkec.repository.EventsRepository;
import uz.tashkec.service.EventsService;
import uz.tashkec.service.dto.EventsDTO;
import uz.tashkec.service.mapper.EventsMapper;

/**
 * Service Implementation for managing {@link Events}.
 */
@Service
@Transactional
public class EventsServiceImpl implements EventsService {

    private final Logger log = LoggerFactory.getLogger(EventsServiceImpl.class);

    private final EventsRepository eventsRepository;

    private final EventsMapper eventsMapper;

    public EventsServiceImpl(EventsRepository eventsRepository, EventsMapper eventsMapper) {
        this.eventsRepository = eventsRepository;
        this.eventsMapper = eventsMapper;
    }

    @Override
    public EventsDTO save(EventsDTO eventsDTO) {
        log.debug("Request to save Events : {}", eventsDTO);
        Events events = eventsMapper.toEntity(eventsDTO);
        events = eventsRepository.save(events);
        return eventsMapper.toDto(events);
    }

    @Override
    public EventsDTO update(EventsDTO eventsDTO) {
        log.debug("Request to update Events : {}", eventsDTO);
        Events events = eventsMapper.toEntity(eventsDTO);
        events = eventsRepository.save(events);
        return eventsMapper.toDto(events);
    }

    @Override
    public Optional<EventsDTO> partialUpdate(EventsDTO eventsDTO) {
        log.debug("Request to partially update Events : {}", eventsDTO);

        return eventsRepository
            .findById(eventsDTO.getId())
            .map(existingEvents -> {
                eventsMapper.partialUpdate(existingEvents, eventsDTO);

                return existingEvents;
            })
            .map(eventsRepository::save)
            .map(eventsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventsDTO> findAll() {
        log.debug("Request to get all Events");
        return eventsRepository.findAll().stream().map(eventsMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EventsDTO> findOne(Long id) {
        log.debug("Request to get Events : {}", id);
        return eventsRepository.findById(id).map(eventsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Events : {}", id);
        eventsRepository.deleteById(id);
    }
}
